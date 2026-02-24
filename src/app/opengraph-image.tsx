import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ChillSleep — Techniques for a Quiet Night';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#F8F6F3',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 60,
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
                        <div
                            style={{
                                backgroundColor: '#6366F1',
                                color: '#fff',
                                padding: '8px 22px',
                                borderRadius: 9999,
                                fontSize: 20,
                                fontWeight: 600,
                                display: 'flex',
                            }}
                        >
                            50+ Sleep Techniques
                        </div>
                    </div>
                    <div
                        style={{
                            fontSize: 76,
                            fontWeight: 800,
                            color: '#1C1917',
                            lineHeight: 1.1,
                            letterSpacing: '-0.03em',
                            maxWidth: 900,
                            display: 'flex',
                        }}
                    >
                        Sleep better, starting tonight.
                    </div>
                    <div
                        style={{
                            fontSize: 28,
                            color: '#78716C',
                            marginTop: 20,
                            maxWidth: 820,
                            lineHeight: 1.4,
                            display: 'flex',
                        }}
                    >
                        Proven breathing, mindfulness, and bedtime habits to help you fall asleep faster.
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#6366F1', display: 'flex' }} />
                    <div style={{ fontSize: 24, fontWeight: 600, color: '#1C1917', display: 'flex' }}>
                        chill-sleep.com
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
