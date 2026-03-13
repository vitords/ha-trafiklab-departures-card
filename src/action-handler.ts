import { ActionHandlerEvent } from "custom-card-helpers";

interface ActionHandlerOptions {
  hasHold?: boolean;
  hasDoubleClick?: boolean;
}

interface ActionHandlerElement extends HTMLElement {
  actionHandler?: boolean;
}

class ActionHandler extends HTMLElement {
  public holdTime: number = 500;
  protected timer?: ReturnType<typeof setTimeout>;
  protected held: boolean = false;
  private dblClickTimeout?: ReturnType<typeof setTimeout>;

  connectedCallback() {
    Object.defineProperty(this, "holdTime", {
      value: 500,
      writable: false,
    });
  }

  bind(element: ActionHandlerElement, options: ActionHandlerOptions = {}) {
    if (element.actionHandler) return;
    element.actionHandler = true;

    element.addEventListener("contextmenu", (e) => {
      const target = e.target as HTMLElement;
      const node = target.closest("ha-card") as HTMLElement;
      if (!node) return;
      e.preventDefault();
      e.stopPropagation();
    });

    const handleEnter = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        handleClick(e, false, false);
      }
    };

    const handleClick = (
      e: Event,
      inDouble: boolean,
      inHold: boolean
    ) => {
      const target = e.target as HTMLElement;
      const node = target.closest("ha-card") as HTMLElement;
      if (!node) return;

      const detail: ActionHandlerEvent["detail"] = {
        action: inHold ? "hold" : inDouble ? "double_tap" : "tap",
      };
      node.dispatchEvent(
        new CustomEvent("action", { bubbles: true, composed: true, detail })
      );
    };

    element.addEventListener("keydown", handleEnter);

    let startX: number, startY: number;
    let clickCount = 0;

    const onPointerDown = (e: PointerEvent) => {
      startX = e.clientX;
      startY = e.clientY;
      this.held = false;
      this.timer = setTimeout(() => {
        this.held = true;
        handleClick(e, false, true);
      }, this.holdTime);
    };

    const onPointerUp = (e: PointerEvent) => {
      clearTimeout(this.timer);
      if (this.held) return;
      const diffX = Math.abs(e.clientX - startX);
      const diffY = Math.abs(e.clientY - startY);
      if (diffX > 10 || diffY > 10) return;

      if (options.hasDoubleClick) {
        clickCount++;
        if (clickCount === 1) {
          this.dblClickTimeout = setTimeout(() => {
            clickCount = 0;
            handleClick(e, false, false);
          }, 250);
        } else {
          clearTimeout(this.dblClickTimeout);
          clickCount = 0;
          handleClick(e, true, false);
        }
      } else {
        handleClick(e, false, false);
      }
    };

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointerup", onPointerUp);
    element.addEventListener("pointercancel", () => {
      clearTimeout(this.timer);
      this.held = false;
    });
  }
}

customElements.define("action-handler-trafiklab", ActionHandler);

export const actionHandler = (options: ActionHandlerOptions = {}) => {
  const _actionHandler = document.body.querySelector(
    "action-handler-trafiklab"
  ) as ActionHandler;

  if (!_actionHandler) {
    const ah = document.createElement("action-handler-trafiklab") as ActionHandler;
    document.body.appendChild(ah);
  }

  return (el: Element) => {
    (_actionHandler || document.body.querySelector("action-handler-trafiklab") as ActionHandler).bind(
      el as ActionHandlerElement,
      options
    );
  };
};
