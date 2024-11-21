import {useState, useRef} from "react";

export default function Player() {
  const playerName = useRef();
  const [name, setName] = useState('');

  function handleClick() {
    setName(playerName.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {name ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}

// Using only the useState hook:
// export default function Player() {
//   const [name, setName] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//
//   function handleChange(event) {
//     setSubmitted(false);
//     setName(event.target.value);
//   }
//
//   function handleClick() {
//     setSubmitted(true);
//   }
//
//   return (
//     <section id="player">
//       <h2>Welcome {submitted ? name : 'unknown entity'}</h2>
//       <p>
//         <input type="text" value={name} onChange={handleChange}/>
//         <button onClick={handleClick}>Set Name</button>
//       </p>
//     </section>
//   );
// }
