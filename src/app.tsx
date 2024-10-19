import '~/assets/style';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import { MetaProvider } from '@solidjs/meta';

export default function TheApp(): JSXElement {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Suspense>
						{props.children}
					</Suspense>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}