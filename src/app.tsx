import '~/assets/style';
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';

export default function TheApp(): JSXElement {
	return (
		<Router
			root={(props) => (
				<Suspense>
					{props.children}
				</Suspense>
			)}
		>
			<FileRoutes />
		</Router>
	);
}