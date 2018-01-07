/**
 * you can add whatever you wanna handle
 * require.extensions['.scss'] = noop; 
 * require.extensions['.css'] = noop; 
 */
function noop() { 
	return null; 
} 
require.extensions['.less'] = noop;
