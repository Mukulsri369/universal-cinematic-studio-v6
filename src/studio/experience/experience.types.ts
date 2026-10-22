export type LightingMood = 'gallery'|'warm-gallery'|'jewelry'|'automotive'|'fashion'|'cosmic'|'tech'|'architectural'|'daylight';
export type CameraStyle = 'reveal'|'architectural'|'macro'|'sweep'|'runway'|'orbit';
export type MotionStyle = 'precision'|'slow'|'kinetic'|'editorial'|'immersive';
export type EffectStyle = 'none'|'soft'|'glow';
export type ExperiencePreset = {mood:LightingMood;camera:CameraStyle;motion:MotionStyle;effects:EffectStyle;productInteraction:'orbit'};
export type ProductHotspot = {id:string;label:string;description:string;position:[number,number,number]};
export type ProductVariant = {id:string;label:string;accent:string};
