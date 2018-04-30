import './adapter/common';

import mock from './adapter/adapter';

mock.onAny().passThrough();
