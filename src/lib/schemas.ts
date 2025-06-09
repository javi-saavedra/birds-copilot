import { gql } from '@apollo/client'

export interface Bird {
  id: string
  thumb_url: string
  image_url: string
  latin_name: string
  english_name: string
  notes: Note[]
}

export interface Note {
  id: string
  comment: string
  timestamp: number
}

export const GET_BIRDS = gql`
  query GetBirds {
    birds {
      id
      thumb_url
      image_url
      latin_name
      english_name
    }
  }
`

export const GET_BIRD = gql`
  query GetBird($id: ID!) {
    bird(id: $id) {
      id
      thumb_url
      image_url
      latin_name
      english_name
      notes {
        id
        comment
        timestamp
      }
    }
  }
`

export const ADD_NOTE = gql`
  mutation AddNote($birdId: ID!, $comment: String!, $timestamp: Int!) {
    addNote(birdId: $birdId, comment: $comment, timestamp: $timestamp)
  }
`

export interface GetBirdsResponse {
  birds: Bird[]
}

export interface GetBirdResponse {
  bird: Bird | null
}

export interface AddNoteResponse {
  addNote: string // Returns the ID of the new note
}

export interface AddNoteVariables {
  birdId: string
  comment: string
  timestamp: number
}
