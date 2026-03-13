export interface AnimationPreset {
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
}

export const ANIMATION_PRESETS: Record<string, AnimationPreset> = {
  flash: {
    keyframes: [
      { opacity: "1" },
      { opacity: "0" },
      { opacity: "1" },
      { opacity: "0" },
      { opacity: "1" },
    ],
    options: { duration: 3000, iterations: Infinity },
  },
  shakeX: {
    keyframes: [
      { transform: "translateX(0)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
      { transform: "translateX(0)" },
    ],
    options: { duration: 800, iterations: Infinity },
  },
  shakeY: {
    keyframes: [
      { transform: "translateY(0)" },
      { transform: "translateY(-10px)" },
      { transform: "translateY(10px)" },
      { transform: "translateY(-10px)" },
      { transform: "translateY(10px)" },
      { transform: "translateY(0)" },
    ],
    options: { duration: 800, iterations: Infinity },
  },
  fadeIn: {
    keyframes: [{ opacity: "0" }, { opacity: "1" }],
    options: { duration: 2000, iterations: Infinity },
  },
  fadeOut: {
    keyframes: [{ opacity: "1" }, { opacity: "0" }],
    options: { duration: 2000, iterations: Infinity },
  },
  zoomIn: {
    keyframes: [
      { transform: "scale(0.5)", opacity: "0" },
      { transform: "scale(1)", opacity: "1" },
    ],
    options: { duration: 2000, iterations: Infinity },
  },
  bounce: {
    keyframes: [
      { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0.215,0.61,0.355,1)" },
      { transform: "translateY(-30px)", animationTimingFunction: "cubic-bezier(0.755,0.05,0.855,0.06)" },
      { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0.215,0.61,0.355,1)" },
    ],
    options: { duration: 1000, iterations: Infinity },
  },
};
