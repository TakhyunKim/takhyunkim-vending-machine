const LIMIT_COUNT_OF_100 = 10;
const LIMIT_COUNT_OF_500 = 10;
const LIMIT_COUNT_OF_1000 = 10;
const LIMIT_COUNT_OF_5000 = 10;
const LIMIT_COUNT_OF_10000 = 10;

export class Change {
  private "countOf100": number;
  private "countOf500": number;
  private "countOf1000": number;
  private "countOf5000": number;
  private "countOf10000": number;

  constructor(
    countOf100: number,
    countOf500: number,
    countOf1000: number,
    countOf5000: number,
    countOf10000: number
  ) {
    this.countOf100 = countOf100;
    this.countOf500 = countOf500;
    this.countOf1000 = countOf1000;
    this.countOf5000 = countOf5000;
    this.countOf10000 = countOf10000;
  }

  checkLimitBalance() {
    if (this.countOf100 < LIMIT_COUNT_OF_100) {
      throw new Error("100원 잔고 부족");
    }
    if (this.countOf500 < LIMIT_COUNT_OF_500) {
      throw new Error("500원 잔고 부족");
    }
    if (this.countOf1000 < LIMIT_COUNT_OF_1000) {
      throw new Error("1000원 잔고 부족");
    }
    if (this.countOf5000 < LIMIT_COUNT_OF_5000) {
      throw new Error("5000원 잔고 부족");
    }
    if (this.countOf10000 < LIMIT_COUNT_OF_10000) {
      throw new Error("10000원 잔고 부족");
    }

    return true;
  }

  /**
   * @description 잔돈 계산 및 지급
   *
   * 큰 단위부터 작은 단위로 잔돈을 계산하고 지급합니다.
   * 잔돈이 부족하거나 정확히 거슬러 줄 수 없으면 에러를 발생시킵니다.
   *
   * @param amountOfChange 필요한 잔돈 금액
   * @returns 각 화폐 단위별 개수
   */
  getChange(amountOfChange: number) {
    // 100원 단위가 아니면 에러
    if (amountOfChange % 100 !== 0) {
      throw new Error("100원 단위로만 거슬러 줄 수 있습니다");
    }

    let remaining = amountOfChange;
    const result = {
      "10000": 0,
      "5000": 0,
      "1000": 0,
      "500": 0,
      "100": 0,
    };

    // 임시 카운트 (실제 차감 전에 계산 가능 여부 확인)
    let tempCountOf10000 = this.countOf10000;
    let tempCountOf5000 = this.countOf5000;
    let tempCountOf1000 = this.countOf1000;
    let tempCountOf500 = this.countOf500;
    let tempCountOf100 = this.countOf100;

    // 1. 10000원 계산
    const need10000 = Math.floor(remaining / 10000);
    const use10000 = Math.min(need10000, tempCountOf10000);
    result["10000"] = use10000;
    remaining -= use10000 * 10000;
    tempCountOf10000 -= use10000;

    // 2. 5000원 계산
    const need5000 = Math.floor(remaining / 5000);
    const use5000 = Math.min(need5000, tempCountOf5000);
    result["5000"] = use5000;
    remaining -= use5000 * 5000;
    tempCountOf5000 -= use5000;

    // 3. 1000원 계산
    const need1000 = Math.floor(remaining / 1000);
    const use1000 = Math.min(need1000, tempCountOf1000);
    result["1000"] = use1000;
    remaining -= use1000 * 1000;
    tempCountOf1000 -= use1000;

    // 4. 500원 계산
    const need500 = Math.floor(remaining / 500);
    const use500 = Math.min(need500, tempCountOf500);
    result["500"] = use500;
    remaining -= use500 * 500;
    tempCountOf500 -= use500;

    // 5. 100원 계산
    const need100 = Math.floor(remaining / 100);
    const use100 = Math.min(need100, tempCountOf100);
    result["100"] = use100;
    remaining -= use100 * 100;
    tempCountOf100 -= use100;

    // 정확히 거슬러 줄 수 없으면 에러
    if (remaining > 0) {
      throw new Error("잔돈이 부족합니다");
    }

    // 계산 성공 시 실제 잔액 차감
    this.countOf10000 = tempCountOf10000;
    this.countOf5000 = tempCountOf5000;
    this.countOf1000 = tempCountOf1000;
    this.countOf500 = tempCountOf500;
    this.countOf100 = tempCountOf100;

    return result;
  }
}
