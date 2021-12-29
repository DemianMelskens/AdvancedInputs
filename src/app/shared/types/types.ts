export type Consumer<T> = (value: T) => void;
export type Function = () => void;

export type VectorType2d = 'x' | 'y';
export type VectorType3d = 'x' | 'y' | 'z';
export type VectorType4d = 'x' | 'y' | 'z' | 'w';

export type Vector2D = { x: number, y: number };
export type Vector3D = { x: number, y: number, z: number };
export type Vector4D = { x: number, y: number, z: number, w: number };
