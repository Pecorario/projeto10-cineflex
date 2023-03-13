import * as S from './style';

export default function Form({ seats, infos, setInfos, handleSubmit }) {
  function formatCpf(v) {
    v = v.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return v;
  }

  function handleChangeName(id, value) {
    const nameToBeChanged = infos.find(item => item.idAssento === id);
    const idxNameToBeChanged = infos.findIndex(item => item.idAssento === id);
    const newName = {
      idAssento: nameToBeChanged.idAssento,
      nome: value,
      cpf: nameToBeChanged.cpf
    };

    const oldInfos = [...infos];
    oldInfos[idxNameToBeChanged] = newName;
    setInfos(oldInfos);
  }

  function handleChangeCPF(id, value) {
    const cpfToBeChanged = infos.find(item => item.idAssento === id);
    const idxCpfToBeChanged = infos.findIndex(item => item.idAssento === id);
    const newCpf = {
      idAssento: cpfToBeChanged.idAssento,
      nome: cpfToBeChanged.nome,
      cpf: formatCpf(value)
    };

    const oldInfos = [...infos];
    oldInfos[idxCpfToBeChanged] = newCpf;
    setInfos(oldInfos);
  }

  function getSeatNumber(id) {
    const seatNumber = seats.find(item => item.id === id);

    return seatNumber.name || '-';
  }

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      {infos?.map(info => (
        <div key={info.idAssento}>
          Nome do Comprador - Poltrona {getSeatNumber(info.idAssento)}:
          <input
            placeholder="Digite seu nome..."
            data-test="client-name"
            value={info.nome}
            onChange={e => handleChangeName(info.idAssento, e.target.value)}
            required
          />
          CPF do Comprador - Poltrona {getSeatNumber(info.idAssento)}:
          <input
            placeholder="Digite seu CPF..."
            data-test="client-cpf"
            value={info.cpf}
            onChange={e => handleChangeCPF(info.idAssento, e.target.value)}
            minlength={14}
            maxlength={14}
            required
          />
        </div>
      ))}
      <button
        type="submit"
        data-test="book-seat-btn"
        disabled={infos.length === 0}
      >
        Reservar Assento(s)
      </button>
    </S.FormContainer>
  );
}
