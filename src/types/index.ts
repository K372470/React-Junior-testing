export type Id = number | string;

export namespace DataTypes {
  export type CombinedProperty = Comment | Todo | Post | Photo | Album;

  export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }

  export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }

  export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

  export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }

  export interface Album {
    userId: number;
    id: number;
    title: string;
  }
}
