// import { useLoaderData } from 'react-router';
// import { LoaderData } from '../types';

import { ActionFunctionArgs, json, useSubmit, useLoaderData, Link } from "react-router-dom";
import { LoaderData } from "../types";
import { redirect } from "react-router-dom";

export type Game = {
  _id: string,
  history: (string | null)[][]
};

export async function loader() {

  const url = "http://localhost:8000/tic-tac-toe-games";
  const response = await fetch(url)


  // To be implemented
  console.log(response)
  return await response.json() as Game[];
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json();
  console.log('running action', body);
  const url = "http://localhost:8000/tic-tac-toe-games"
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: myHeaders,
  })
  const gameId = await response.json()
  // POST call to API to create a new game
  if (response) {
    return redirect(`/games/${gameId}`);
  }
  // On success, redirect to /games/<-new-game-id>

}

export default function GameScreen() {
  const data = useLoaderData() as LoaderData<typeof loader>;
  console.log(data)

  const gameList = data.map((elemnet, index) => {
    return (
      <li>
        <Link to={elemnet._id}>Game #{index}

        </Link>
      </li>
    )
  })
  // const data = useLoaderData() as LoaderData<typeof loader>;
  const submit = useSubmit();

  // 1. Render a list of all existing games in the data base. 
  // 2. Clicking on a game should take the user to that game page
  // 3. Add a button to create a new game. On creating a new game, the user should be redirected to that page.
  const history = [Array(9).fill(null)]
  const createNewGame = () => {

    submit(
      {
        history
        // request body parameters if any
      },
      {
        method: 'POST',
        encType: 'application/json'
      }
    );
  }

  return (
    <div>
      <h3>Existing Games</h3>
      <div>
        <button
          onClick={createNewGame}
        >
          Create New Game
        </button>
      </div>
      <div>
        {/* Display list of games */}
        <ul>
          {gameList}

        </ul>
      </div>

    </div>

  );
};