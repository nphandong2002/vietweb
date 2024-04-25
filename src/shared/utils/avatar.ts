export function generateAvatar(name: string, type?: 'user' | 'room'): string {
  if (typeof window === 'undefined') return '';
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!type) type = 'user';
  if (!context) throw new Error('Canvas context is not supported.');

  // Cài đặt kích thước của canvas
  canvas.width = 100;
  canvas.height = 100;

  // Vẽ avatar
  context.beginPath();
  type == 'user'
    ? context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2)
    : context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#FFA500'; // Màu cam
  context.fill();
  context.closePath();

  // Vẽ ký tự đầu của mỗi từ
  context.fillStyle = '#FFFFFF'; // Màu trắng
  context.font = 'bold 40px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  const words = name.split(' ').slice(0, 2); // Lấy 2 từ đầu tiên
  context.fillText(
    words.map((word) => word.charAt(0).toUpperCase()).join(''),
    canvas.width / 2,
    canvas.height / 2
  );

  return canvas.toDataURL();
}
