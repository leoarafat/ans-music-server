import { SingleTrack } from '../single-track/single.model';

const updatePrimaryArtist = async (id: string, payload: any) => {
  const singleArtists = await SingleTrack.findOne({
    primaryArtist: {
      $elemMatch: {
        _id: id,
      },
    },
  });
};
export const ArtistsService = {
  updatePrimaryArtist,
};
