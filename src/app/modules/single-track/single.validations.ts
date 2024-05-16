import { z } from 'zod';
const singleTrackSchema = z.object({
  body: z.object({
    data: z.object({
      user: z.string({
        required_error: 'user is required',
      }),
      //   trackType: z.string({
      //     required_error: 'trackType is required',
      //   }),
      trackType: z.enum(['music', 'classic-music', 'jazz-music'], {
        required_error: 'trackType',
      }),
      isRelease: z.enum(['yes', 'no'], {
        required_error: 'isRelease',
      }),
      instrumental: z.enum(['yes', 'no'], {
        required_error: 'instrumental',
      }),
      secondaryTrackType: z.enum(
        ['original', 'karaoke', 'melody', 'cover', 'cover-by-band'],
        {
          required_error: 'secondaryTrackType',
        },
      ),
      parentalAdvisory: z.enum(['explicit', 'no-explicit', 'edited'], {
        required_error: 'parentalAdvisory',
      }),
      releaseTitle: z.string({
        required_error: 'releaseTitle is required',
      }),
      subtitle: z.string({
        required_error: 'subtitle is required',
      }),
      line: z.string({
        required_error: 'line is required',
      }),
      primaryArtist: z
        .array(z.string())
        .nonempty({ message: 'At least one primary artist ID is required' }),
      writer: z
        .array(
          z.object({
            writerName: z
              .string()
              .nonempty({ message: 'Writer name is required' }),
          }),
        )
        .nonempty({ message: 'At least one writer is required' }),
      composer: z
        .array(
          z.object({
            composerName: z
              .string()
              .nonempty({ message: 'Composer name is required' }),
          }),
        )
        .nonempty({ message: 'At least one composer is required' }),
      musicDirector: z
        .array(
          z.object({
            musicDirectorName: z
              .string()
              .nonempty({ message: 'Music director name is required' }),
          }),
        )
        .nonempty({ message: 'At least one music director is required' }),
      producer: z
        .array(
          z.object({
            producerName: z
              .string()
              .nonempty({ message: 'Producer name is required' }),
          }),
        )
        .nonempty({ message: 'At least one producer is required' }),
      actor: z.string().nonempty({ message: 'Actor is required' }),
      filmDirector: z
        .string()
        .nonempty({ message: 'Film director is required' }),
      releaseId: z.string().optional(),
      genre: z.string().nonempty({ message: 'Genre is required' }),
      //   upcEan: z.string().nonempty({ message: 'UPC/EAN is required' }),
      subGenre: z.string().nonempty({ message: 'Sub-genre is required' }),
      producerCatalogNumber: z
        .string()
        .nonempty({ message: 'Producer catalog number is required' }),
      productionYear: z
        .string()
        .nonempty({ message: 'Production year is required' }),
      label: z.string().nonempty({ message: 'Label ID is required' }),
      publisher: z.string().nonempty({ message: 'Publisher is required' }),
      youtubeUrl: z.string().nonempty({ message: 'YouTube URL is required' }),
      catalogNumber: z
        .string()
        .nonempty({ message: 'Catalog number is required' }),
      tiktokStartInSecond: z
        .string()
        .nonempty({ message: 'TikTok start in second is required' }),
      trackLanguage: z
        .string()
        .nonempty({ message: 'Track language is required' }),
      releaseDate: z.string().nonempty({ message: 'Release date is required' }),
      isAdvancePurchase: z.boolean(),
    }),
  }),
  files: z.object({
    audio: z
      .array(
        z.object({}).refine(() => true, {
          message: 'audio is required',
        }),
      )
      .nonempty({ message: 'Audio array cannot be empty' }),
    image: z
      .array(
        z.object({}).refine(() => true, {
          message: 'image is required',
        }),
      )
      .nonempty({ message: 'image array cannot be empty' }),
  }),
});
export const SingleTrackZodSchema = {
  singleTrackSchema,
};
