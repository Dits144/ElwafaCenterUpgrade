import React from 'react';

type Props = { children: React.ReactNode; routeKey: string };
type State = { failed: boolean; message: string; retry: number };

/** Catches render failures in a route without discarding the other app state. */
export class RouteErrorBoundary extends React.Component<Props, State> {
  state: State = { failed: false, message: '', retry: 0 };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { failed: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Route failed to render', this.props.routeKey, error, info.componentStack);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.routeKey !== this.props.routeKey && this.state.failed) {
      this.setState({ failed: false, message: '' });
    }
  }

  render() {
    if (this.state.failed) {
      return <section role="alert" className="mx-auto my-16 max-w-xl rounded-2xl border border-amber-200 bg-[#F8F6F0] p-6 text-[#123C35]">
        <h1 className="font-serif text-3xl">Halaman ini belum dapat ditampilkan</h1>
        <p className="mt-3 text-sm">Terjadi masalah saat menampilkan bagian ini. Data yang telah tersimpan tidak dihapus.</p>
        <p className="mt-2 break-words text-xs text-[#1E5447]">Detail teknis: {this.state.message || 'Kesalahan tampilan tidak diketahui'}</p>
        <button type="button" className="mt-5 min-h-11 rounded-lg bg-[#123C35] px-5 text-sm text-white" onClick={() => this.setState(state => ({ failed: false, message: '', retry: state.retry + 1 }))}>Coba tampilkan lagi</button>
      </section>;
    }
    return <React.Fragment key={this.state.retry}>{this.props.children}</React.Fragment>;
  }
}
