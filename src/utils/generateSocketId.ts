export default function generateSocketId(): string {
    return 'socket_' + Math.random().toString(36).substr(2, 9);
  }