export type Consumer = (value: any) => void;
export type Function = () => void;

export type VectorType = 'x' | 'y' | 'z' | 'w';
export type Vector2D = { x: number, y: number };
export type Vector3D = { x: number, y: number, z: number };
export type Vector4D = { x: number, y: number, z: number, w: number };
