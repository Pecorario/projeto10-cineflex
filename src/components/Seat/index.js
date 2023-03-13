import * as S from './style';

export default function Seat({ seat, isSelected, handleSelectedSeat }) {
  return (
    <S.SeatItem
      data-test="seat"
      isAvailable={seat.isAvailable}
      isSelected={isSelected}
      onClick={() => handleSelectedSeat(seat.id, seat.isAvailable)}
    >
      {seat.name}
    </S.SeatItem>
  );
}
