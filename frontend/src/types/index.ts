export type TagObject = {
  tag: {
    title: string;
  };
};

export type TaskDetails = {
  id: number;
  createdAt: string;
  lastReminderSentAt: string;
  link: string;
  reminderDate: string;
  tags: TagObject[];
  title: string;
  type: string;
  updatedAt: string;
  userId: number;
  why: string;
  status: string;
};

export type AddContentForm = {
  title: string;
  type: string;
  link: string;
  why: string;
  tags: string;
  reminderDate: string;
};

export type ShareInfo = {
  isShared: boolean;
  shareLink: string | null;
};

export type TaskTypeStyle = {
  bg: string;
  text: string;
  border: string;
};