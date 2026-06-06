const POSITIVE_WAVE_COLOR = "#c7d2fe";
const NEGATIVE_WAVE_COLOR = "#d1d5db";
const NEGATIVE_HEIGHT_SCALE = 0.32;

type ChannelData = Array<Float32Array | number[]>;

function getPixelRatio(): number {
  return Math.max(1, window.devicePixelRatio || 1);
}

function drawRoundedBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  color: string,
) {
  if (height < 1) return;

  ctx.fillStyle = color;
  ctx.beginPath();

  if (radius > 0 && "roundRect" in ctx) {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.rect(x, y, width, height);
  }

  ctx.fill();
}

function calculateVerticalScale(channelData: ChannelData): number {
  let maxPeak = 0;

  for (const channel of channelData) {
    for (let index = 0; index < channel.length; index += 1) {
      maxPeak = Math.max(maxPeak, Math.abs(Number(channel[index] ?? 0)));
    }
  }

  return maxPeak > 0 ? 1 / maxPeak : 1;
}

export function renderAsymmetricWaveform(channelData: ChannelData, ctx: CanvasRenderingContext2D) {
  const { width, height } = ctx.canvas;
  const channel = channelData[0] ?? [];

  if (channel.length === 0 || width === 0 || height === 0) {
    return;
  }

  const pixelRatio = getPixelRatio();
  const barWidth = 2 * pixelRatio;
  const barGap = 2 * pixelRatio;
  const barRadius = 2 * pixelRatio;
  const barSpacing = barWidth + barGap;
  const halfHeight = height / 2;
  const centerY = halfHeight;
  const vScale = calculateVerticalScale(channelData);
  const barIndexScale = channel.length > 0 ? width / barSpacing / channel.length : 0;

  let previousBucket = 0;
  let maxMagnitude = 0;

  for (let index = 0; index <= channel.length; index += 1) {
    const bucket = Math.floor(index * barIndexScale);

    if (bucket > previousBucket) {
      const positiveHeight = Math.max(
        barRadius,
        Math.round(maxMagnitude * halfHeight * vScale * 0.92),
      );
      const negativeHeight = Math.max(
        barRadius,
        Math.round(positiveHeight * NEGATIVE_HEIGHT_SCALE),
      );
      const x = previousBucket * barSpacing;

      drawRoundedBar(
        ctx,
        x,
        centerY - positiveHeight,
        barWidth,
        positiveHeight,
        barRadius,
        POSITIVE_WAVE_COLOR,
      );

      drawRoundedBar(
        ctx,
        x,
        centerY,
        barWidth,
        negativeHeight,
        barRadius,
        NEGATIVE_WAVE_COLOR,
      );

      previousBucket = bucket;
      maxMagnitude = 0;
    }

    maxMagnitude = Math.max(maxMagnitude, Math.abs(Number(channel[index] ?? 0)));
  }
}
