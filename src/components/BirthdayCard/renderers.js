import { roundRect, wrapText } from './utils';

export const drawBackground = (ctx, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() * 0.001;

    ctx.save();
    // Pink Blob
    ctx.globalCompositeOperation = 'multiply';
    ctx.filter = 'blur(40px)';
    ctx.beginPath();
    ctx.fillStyle = 'rgba(244, 114, 182, 0.4)'; // pink-400
    ctx.arc(centerX - 200 + Math.sin(time) * 20, centerY - 150 + Math.cos(time * 0.8) * 20, 100, 0, Math.PI * 2);
    ctx.fill();

    // Purple Blob
    ctx.beginPath();
    ctx.fillStyle = 'rgba(192, 132, 252, 0.4)'; // purple-400
    ctx.arc(centerX + 200 + Math.sin(time * 1.1) * 20, centerY - 50 + Math.cos(time * 0.9) * 20, 100, 0, Math.PI * 2);
    ctx.fill();

    // Yellow Blob
    ctx.beginPath();
    ctx.fillStyle = 'rgba(254, 240, 138, 0.4)'; // yellow-200
    ctx.arc(centerX + Math.sin(time * 0.7) * 20, centerY + 150 + Math.cos(time * 1.2) * 20, 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
};

export const drawChatBox = (ctx, state, translations) => {
    const { chatBox, text, width, height } = state;
    if (chatBox.opacity <= 0) return;

    const centerX = width / 2;
    const centerY = height / 2;

    ctx.save();
    ctx.translate(centerX, centerY - 60);
    ctx.scale(chatBox.scale, chatBox.scale);
    ctx.globalAlpha = chatBox.opacity;

    // Box dimensions (scaled down 30%)
    const boxW = Math.min(700, width * 0.9) * 0.7;
    const boxH = 300 * 0.7;
    const boxX = -boxW / 2;
    const boxY = -boxH / 2;

    // Box Background (Gradient)
    const grad = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH);
    grad.addColorStop(0, 'rgba(17, 24, 39, 0.95)'); // gray-900
    grad.addColorStop(1, 'rgba(31, 41, 55, 0.95)'); // gray-800

    ctx.fillStyle = grad;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    roundRect(ctx, boxX, boxY, boxW, boxH, 24);
    ctx.fill();

    // Border
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.8)'; // yellow-400/80
    ctx.stroke();

    // Corner Decorations
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgb(253, 224, 71)'; // yellow-300
    const cornerSize = 32;
    const offset = -2;

    // TL
    ctx.beginPath();
    ctx.moveTo(boxX + offset, boxY + offset + cornerSize);
    ctx.lineTo(boxX + offset, boxY + offset);
    ctx.lineTo(boxX + offset + cornerSize, boxY + offset);
    ctx.stroke();

    // TR
    ctx.beginPath();
    ctx.moveTo(boxX + boxW - offset - cornerSize, boxY + offset);
    ctx.lineTo(boxX + boxW - offset, boxY + offset);
    ctx.lineTo(boxX + boxW - offset, boxY + offset + cornerSize);
    ctx.stroke();

    // BL
    ctx.beginPath();
    ctx.moveTo(boxX + offset, boxY + boxH - offset - cornerSize);
    ctx.lineTo(boxX + offset, boxY + boxH - offset);
    ctx.lineTo(boxX + offset + cornerSize, boxY + boxH - offset);
    ctx.stroke();

    // BR
    ctx.beginPath();
    ctx.moveTo(boxX + boxW - offset - cornerSize, boxY + boxH - offset);
    ctx.lineTo(boxX + boxW - offset, boxY + boxH - offset);
    ctx.lineTo(boxX + boxW - offset, boxY + boxH - offset - cornerSize);
    ctx.stroke();

    // Name Tag (scaled 0.7)
    const nameTagW = 160 * 0.7;
    const nameTagH = 44 * 0.7;
    const nameTagX = boxX + (40 * 0.7);
    const nameTagY = boxY - (22 * 0.7);

    const nameGrad = ctx.createLinearGradient(nameTagX, nameTagY, nameTagX + nameTagW, nameTagY);
    nameGrad.addColorStop(0, '#ec4899'); // pink-500
    nameGrad.addColorStop(1, '#a855f7'); // purple-500

    ctx.fillStyle = nameGrad;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    roundRect(ctx, nameTagX, nameTagY, nameTagW, nameTagH, 22);
    ctx.fill();

    ctx.strokeStyle = '#facc15'; // yellow-400
    ctx.lineWidth = 2;
    ctx.stroke();

    // Name Text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px "Dancing Script", cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(translations.name, nameTagX + nameTagW / 2, nameTagY + nameTagH / 2);

    // Message Text
    // Message Text
    ctx.fillStyle = 'white';
    // Scaled font size
    ctx.font = '500 20px "Dancing Script", cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const textX = 0;
    // Scaled positioning
    const textY = boxY + (80 * 0.7);
    const padding = 60 * 0.7;
    const maxWidth = boxW - (padding * 2);
    const lineHeight = 40 * 0.7;
    wrapText(ctx, text, textX, textY, maxWidth, lineHeight);

    ctx.restore();
};

export const drawButton = (ctx, state, translations) => {
    const { button, isOpen, width, height } = state;
    if (button.opacity <= 0) return;

    const centerX = width / 2;
    const centerY = height / 2;

    ctx.save();
    ctx.translate(centerX, centerY + 140 + button.y);
    const btnScale = button.scale * (button.isHovered ? 1.1 : 1);
    ctx.scale(btnScale, btnScale);
    ctx.globalAlpha = button.opacity;

    // Scaled down by 30% (originally 280x70)
    const btnW = 280 * 0.7;
    const btnH = 70 * 0.7;
    const btnX = -btnW / 2;
    const btnY = -btnH / 2;

    // Update Logic for Hit Area should be in Logic, but for drawing we just draw.
    // Store Hit Area in State during Logic or Render? 
    // Ideally Logic updates state, Render reads it.
    // We will calculate hit area in render for simplicity of syncing, 
    // but typically we should decouple.
    // For now we just draw based on state.

    const btnGrad = ctx.createLinearGradient(btnX, btnY, btnX + btnW, btnY);
    btnGrad.addColorStop(0, '#ec4899'); // pink-500
    btnGrad.addColorStop(0.5, '#a855f7'); // purple-500
    btnGrad.addColorStop(1, '#6366f1'); // indigo-500

    ctx.fillStyle = btnGrad;
    ctx.shadowColor = button.isHovered ? 'rgba(236, 72, 153, 0.5)' : 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = button.isHovered ? 25 : 15;
    ctx.shadowOffsetY = 5;
    roundRect(ctx, btnX, btnY, btnW, btnH, 35);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px "Dancing Script", cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const btnText = isOpen
        ? `${translations.buttonWish} ${translations.wishEmoji}`
        : `${translations.buttonSend} ${translations.emoji}`;

    ctx.fillText(btnText, 0, 0);

    ctx.restore();
};

export const drawParticles = (ctx, particles) => {
    particles.forEach((p) => {
        if (p.life <= 0) return;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(p.scale, p.scale);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
};
