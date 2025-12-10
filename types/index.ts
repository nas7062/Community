interface UserProfile {
  id: string;
  displayName: string;
  imageUri?: string;
  descript?: string;
}

interface Profile extends UserProfile {
  email: string;
  introduce?: string;
  hatId: string;
  handId: string;
  skinId: string;
  topId: string;
  faceId: string;
  bottomId: string;
  background: string;
}

interface ImageUri {
  id: string;
  url: string;
}
interface VoteOption {
  id?: number;
  displayPriority: number;
  content: string;
}

interface CreatePostDto {
  title: string;
  description: string;
  imageUris: ImageUri[];
  voteTitle?: string;
  voteOptions?: VoteOption[];
  profile: UserProfile;
}

interface CreateCommentDto {
  docId: string;
  content: string;
  parentId?: number | null;
  profile: {
    displayName?: string;
    imageUri?: string;
  };
}

interface CreateVoteDto {
  postId: number;
  voteOptionId: number;
}

type PostVoteOption = VoteOption & { userVotes: { userId: string }[] };

interface PostVote {
  id: number;
  title: string;
  options: PostVoteOption[];
}
interface Comment {
  docId: string;
  id: number;
  content: string;
  createdAt: string;
  user: UserProfile;
  isDeleted: boolean;
  parentId?: number | null;
  replies: Comment[];
}

interface Post {
  docId: string;
  id: number;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  author: UserProfile;
  imageUris: ImageUri[];
  likes: string[];
  hasVote: boolean;
  voteCount: number;
  commentCount: number;
  viewCount: number;
  votes?: PostVote[];
  comments?: Comment[];
}

export type {
  Comment,
  CreateCommentDto,
  CreatePostDto,
  CreateVoteDto,
  ImageUri,
  Post,
  PostVote,
  PostVoteOption,
  Profile,
  UserProfile,
  VoteOption,
};
