export class Subscribable<TListener extends () => void, TSnapshot> {
  protected listeners = new Set<TListener>();

  protected snapshot: TSnapshot;

  constructor(snapshot: TSnapshot) {
    this.snapshot = snapshot;
    this.subscribe = this.subscribe.bind(this);
  }

  subscribe(listener: TListener): () => void {
    this.listeners.add(listener);

    this.onSubscribe();

    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }

  hasListeners(): boolean {
    return this.listeners.size > 0;
  }

  /**
   * @description 상태 변경 알림
   *
   * @warning
   * - 이 메서드는 반드시 public method 에서 호출되어야합니다.
   * - 그 외 메서드에서 호출 시, 렌더링 관리가 어려워집니다.
   */
  notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  getSnapshot() {
    return this.snapshot;
  }

  protected onSubscribe(): void {
    // Do nothing
  }

  protected onUnsubscribe(): void {
    // Do nothing
  }
}
