import net from "node:net";

const BACKEND_HOST = "127.0.0.1";
const BACKEND_PORT = 8001;

/**
 * Aborts the run with the start command when nothing listens on the test backend port.
 * A plain TCP connect is used so the check never triggers a backend request of its own.
 */
export default async function globalSetup(): Promise<void> {
  const reachable = await new Promise<boolean>((resolve) => {
    const socket = net.connect({ host: BACKEND_HOST, port: BACKEND_PORT });

    socket.setTimeout(5000, () => {
      socket.destroy();
      resolve(false);
    });
    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
  });

  if (!reachable) {
    throw new Error(
      `Test backend not reachable on ${BACKEND_HOST}:${BACKEND_PORT}\n` +
        "Start it in the backend directory (one Symfony server per directory, stop the one on 8000 first):\n" +
        "  symfony server:stop && symfony server:start --port=8001 --daemon"
    );
  }
}
