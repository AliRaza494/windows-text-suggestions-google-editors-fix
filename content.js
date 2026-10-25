(() => {
  "use strict";

  const PREFIX = "[Windows Text Suggestions Fix]";

  /**
   * Enables autocorrect only on textareas where the page
   * explicitly sets autocorrect="off".
   *
   * @param {ParentNode} root DOM subtree to inspect.
   */
  function fixTextareas(root) {
    const textareas = [];

    if (root instanceof HTMLTextAreaElement) {
      textareas.push(root);
    } else if (root.querySelectorAll) {
      textareas.push(...root.querySelectorAll("textarea"));
    }

    for (const textarea of textareas) {
      const current = textarea.getAttribute("autocorrect");

      if (current?.toLowerCase() !== "off") {
        continue;
      }

      textarea.setAttribute("autocorrect", "on");

      console.info(PREFIX, "Changed autocorrect to on", {
        page: location.href,
        element: textarea
      });
    }
  }

  // Fix textareas already present on the page.
  fixTextareas(document);

  // Handle textareas added, replaced, or reset by the page later.
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        fixTextareas(mutation.target);
        continue;
      }

      for (const node of mutation.addedNodes) {
        if (node instanceof Element) {
          fixTextareas(node);
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["autocorrect"]
  });

  console.info(PREFIX, "Active on", location.href);
})();
