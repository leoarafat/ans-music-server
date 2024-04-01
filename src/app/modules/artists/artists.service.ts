import { SingleTrack } from '../single-track/single.model';

const updatePrimaryArtist = async (id: string, payload: any) => {
  const checkArtistInSingle = await SingleTrack.findById(id);
  console.log(checkArtistInSingle);

  const updatedTrack = await SingleTrack.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedTrack;
};
export const ArtistsService = {
  updatePrimaryArtist,
};
