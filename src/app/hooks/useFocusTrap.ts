import { useCallback, useEffect, useRef } from 'react';

type FocusTrapOptions = {
  focusElementOnOpen?: FocusableElement | string | null; // Element Node (e.g. a ref.current) or string CSS selector
  focusElementOnClose?: FocusableElement | string | null;
};

type FocusableElement = HTMLButtonElement | HTMLLinkElement | HTMLInputElement;
type ContainerElement = HTMLDivElement | HTMLElement; // section, main, etc

/*
 * Usage:
 * const ref = useFocusTrap(active, FocusTrapOptions)
 * return <Component ref={ref} />
 * */

const useFocusTrap: (
  active: boolean, // Whether the Trap should be active: e.g. isModalOpen
  options?: FocusTrapOptions,
) => (node: ContainerElement | null) => void = (active: boolean, options?: FocusTrapOptions) => {
  const ref = useRef<HTMLElement | null>();

  /* <Component ref={ref} /> expects ref to be a ref setter fn: (node) => void */
  const setRef = useCallback(
    (node: ContainerElement | null) => {
      if (node && active) {
        const focusElementOnOpen =
          typeof options?.focusElementOnOpen === 'string'
            ? document.querySelector<FocusableElement>(options.focusElementOnOpen)
            : options?.focusElementOnOpen;

        if (focusElementOnOpen) {
          // wait a frame for the DOM to mount the component
          requestAnimationFrame(() => {
            focusElementOnOpen?.focus();
          });
        }
        ref.current = node;
      } else {
        ref.current = null;
      }
    },
    [active, options],
  );

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const focusableElements = ref?.current?.querySelectorAll<FocusableElement>(
      'a[href], button, input, [tabindex]:not([tabindex="-1"])',
    );
    const firstFocusable = focusableElements?.[0];
    const lastFocusable = focusableElements?.[focusableElements.length - 1];

    const keyPressed: { [key: string]: () => void } = {
      Tab: () => {
        if (e.shiftKey && e.target === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        } else if (!e.shiftKey && e.target === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      },
    };

    if (Object.keys(keyPressed).includes(e.key)) {
      keyPressed[e.key]();
    }
  }, []);

  const focusElementOnClose =
    typeof options?.focusElementOnClose === 'string'
      ? document.querySelector<FocusableElement>(options?.focusElementOnClose)
      : options?.focusElementOnClose;

  useEffect(() => {
    if (!active) return undefined;

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);

      if (focusElementOnClose) {
        requestAnimationFrame(() => {
          focusElementOnClose?.focus();
        });
      }
    };
  }, [active, handleKeyPress, focusElementOnClose]);

  return setRef;
};

export default useFocusTrap;
