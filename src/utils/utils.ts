/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import mp3Duration from 'mp3-duration';
export function formatDuration(durationInSeconds: number): string {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  // Use padStart to ensure two-digit formatting
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
export const getAudioDuration = async (path: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    mp3Duration(path, (err: any, duration: number | PromiseLike<number>) => {
      if (err) {
        reject(err);
      } else {
        resolve(duration);
      }
    });
  });
};

const currentDate = new Date();

// Format the date as MM/DD/YYYY
export const formattedDate = currentDate.toLocaleDateString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
