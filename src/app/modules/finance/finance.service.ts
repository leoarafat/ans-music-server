import { SingleTrack } from '../single-track/single.model';

const allReports = async () => {
  const approvedSong = await SingleTrack.find({ isApproved: 'approved' });
  const totalApprovedSong = SingleTrack.countDocuments(approvedSong);
  const pendingSong = await SingleTrack.find({ isApproved: 'pending' });
  const totalPendingSong = SingleTrack.countDocuments(pendingSong);
  return {
    totalApproved: totalApprovedSong,
    totalPending: totalPendingSong,
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
