let myPageData: any = null;

export function getMyPageData<T = any>(): T | null {
  if (myPageData) return myPageData;

  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem('myPageData');
    if (stored) {
      myPageData = JSON.parse(stored);
      return myPageData;
    }
  }

  return null;
}

export function setMyPageData<T = any>(data: T): void {
  myPageData = data;
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('myPageData', JSON.stringify(data));
  }
}