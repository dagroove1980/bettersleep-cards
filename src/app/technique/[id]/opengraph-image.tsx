import { ImageResponse } from 'next/og';
import { getAllTechniques, getTechniqueById } from '@/lib/techniques';
import { CATEGORY_LABELS } from '@/lib/constants';
import { CATEGORY_COLORS } from '@/lib/colors';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return getAllTechniques().map((t) => ({ id: t.id }));
}

export default async function OGImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const technique = getTechniqueById(id);

  if (!technique) {
    return new ImageResponse(
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: '#F8F6F3', fontSize: 48, fontWeight: 700 }}>
        ChillSleep
      </div>,
      size
    );
  }

  const color = CATEGORY_COLORS[technique.category];
  const label = CATEGORY_LABELS[technique.category];

  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', backgroundColor: '#F8F6F3', padding: 60 }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ backgroundColor: color.bg, color: '#fff', padding: '8px 20px', borderRadius: 9999, fontSize: 20, fontWeight: 600 }}>
            {label}
          </div>
          <div style={{ fontSize: 20, color: '#78716C' }}>
            {technique.timeNeeded}
          </div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, color: '#1C1917', lineHeight: 1.2, maxWidth: 900 }}>
          {technique.name}
        </div>
        <div style={{ fontSize: 28, color: '#78716C', marginTop: 16, maxWidth: 800, lineHeight: 1.4 }}>
          {technique.tagline}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#6366F1' }} />
        <div style={{ fontSize: 24, fontWeight: 600, color: '#1C1917' }}>chill-sleep.com</div>
      </div>
    </div>,
    size
  );
}
