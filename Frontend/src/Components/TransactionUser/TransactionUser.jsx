import "./TransactionUser.css";

export default function TransactionUser(props) {
  return (
    <div className='transaction-user'>
      <div>
        <p className='texte-transaction-user'>{props.texte1}</p>
        <p className='title-transaction-user'>{props.title}</p>
        <p className='texte-transaction-user'>{props.texte2}</p>
      </div>
      <div>
        <button className='btn-transaction-user'>
          View <br /> transactions
        </button>
      </div>
    </div>
  );
}
