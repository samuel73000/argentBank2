import "./User.css";
import TransactionUser from "../../Components/TransactionUser/TransactionUser";
export default function User() {
  return (
    <section className='section-user'>
      <div className='container-title-user'>
        <h1 className='title-user'>
          Welcome back <br />
          <span>Tony Jarvis</span>!
        </h1>
        <button className='btn-edit-user'>Edit Name</button>
      </div>

      <div className='container-transaction-user'>
        <TransactionUser
          texte1='Argent Bank Checking (x8349)'
          texte2='Available Balance'
          title='$2,082.79'
        />
        <TransactionUser
          texte1='Argent Bank Savings (x6712)'
          texte2='Available Balance'
          title='$10,928.42'
        />
        <TransactionUser
          texte1='Argent Bank Credit Card (x8349)'
          texte2='Current Balance'
          title='$184.30'
        />
      </div>
    </section>
  );
}
