import { Pact } from "../../src/gql"
import PactCardH from "../pacts/pactCardH"

export default function PactList ({data}: {data?: Array<Pact>}) {
  return (
    <>
      {!data &&
        <div>No Results</div>
      }
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 justify-center">
        {data && data.map((pact, index) => {
          return (
            <PactCardH pact={pact} key={index} />
          )
        })}
      </div>
    </>
  )
}
