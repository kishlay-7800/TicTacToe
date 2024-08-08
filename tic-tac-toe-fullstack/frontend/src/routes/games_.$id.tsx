import { useLoaderData } from 'react-router';
import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import Game from '../components/game';
import { Game as GameType} from './games';
import { useSubmit } from 'react-router-dom';
import { LoaderData } from '../types';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const gameId = params.id;
  const url = `http://localhost:8000/tic-tac-toe-games/${gameId}`;
  const response = await fetch(url)


  // To be implemented
  console.log(response)
  return await response.json() as GameType;
  // To be implemented

}

export async function action({ request, params }: ActionFunctionArgs) {
  const body = await request.json();
  const gameId = params.id;
  const url = `http://localhost:8000/tic-tac-toe-games/${gameId}`;
  console.log('running action', body);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: myHeaders,
  })

  console.log(response)
  // PATCH call to API to update game history
  return null;
}

export default function GameScreen() {
  const data = useLoaderData() as LoaderData<typeof loader>;
  console.log(data)
  const submit = useSubmit();

  const updateGameHistory = (history: (string | null)[][]) => {
    submit(
      {
        history,
      },
      {
        method: 'PATCH',
        encType: 'application/json'
      }
    )
  }



  // 1. Load the game data from the backend and use it to initalize the Game screen
  // 2. When a new move is made, save the updated history in the backend. (Use a PATCH request)

  return (
    <Game 
      initialHistory={data.history}
      updateGameHistoryInDB={updateGameHistory}
    />
  )
};