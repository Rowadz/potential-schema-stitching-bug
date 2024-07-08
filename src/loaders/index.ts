import DataLoader from 'dataloader'
import { Post, User } from '../schema/types'
import axios from 'axios'

let counter = 0
let counter2 = 0
export const userLoader = new DataLoader<number, User>(
  async (ids: readonly number[]): Promise<User[]> => {
    const idQueryParams = ids.map((id) => `id=${id}`).join('&')
    const { data } = await axios.get<User[]>(
      `https://jsonplaceholder.typicode.com/users?${idQueryParams}`
    )

    const usersMap = data.reduce<Record<number, User>>((acc, user: User) => {
      return {
        ...acc,
        [user.id]: user,
      }
    }, {})
    counter++
    return ids.map((id) => usersMap[id])
  }
)

export const postLoader = new DataLoader<number, (Post | undefined)[]>(
  async (userIds: readonly number[]): Promise<(Post | undefined)[][]> => {
    const idQueryParams = userIds.map((id) => `userId=${id}`).join('&')
    const { data } = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts?${idQueryParams}`
    )
    counter2++
    const postsMap = data.reduce<Record<number, Post[]>>(
      (acc, curr: Post) => ({
        ...acc,
        [curr.userId]: [...(acc[curr.userId] || []), curr],
      }),
      {}
    )
    return userIds.map((id) => postsMap[id])
  }
)
