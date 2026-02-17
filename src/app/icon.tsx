import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, backgroundColor: '#6366F1', borderRadius: 8 }}>
      <div style={{ color: '#fff', fontSize: 18 }}>&#9790;</div>
    </div>,
    size
  );
}
