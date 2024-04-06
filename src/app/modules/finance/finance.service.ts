import { Album } from '../album/album.model';
import { SingleTrack } from '../single-track/single.model';

const allReports = async () => {
  const approvedSingleTracks = await SingleTrack.find({
    isApproved: 'approved',
  });
  const approvedAlbums = await Album.find({ isApproved: 'approved' });

  const totalApprovedSingleTracks = approvedSingleTracks.length;
  const totalApprovedAlbums = approvedAlbums.length;

  const pendingSingleTracks = await SingleTrack.find({ isApproved: 'pending' });
  const pendingAlbums = await Album.find({ isApproved: 'pending' });

  const totalPendingSingleTracks = pendingSingleTracks.length;
  const totalPendingAlbums = pendingAlbums.length;

  return {
    totalApproved: totalApprovedSingleTracks + totalApprovedAlbums,
    totalPending: totalPendingSingleTracks + totalPendingAlbums,
  };
};

const approved = async () => {
  const approvedSong = await SingleTrack.find({ isApproved: 'approved' });
  const totalApprovedSong = SingleTrack.countDocuments(approvedSong);
  return {
    totalApproved: totalApprovedSong,
  };
};

export const financeService = {
  allReports,
  approved,
};
