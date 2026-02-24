import { ImageResponse } from 'next/og';

export const size = { width: 48, height: 48 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, backgroundColor: '#6366F1', borderRadius: 10 }}>
      <div style={{ color: '#fff', fontSize: 26 }}>&#9790;</div>
    </div>,
    size
  );
}
