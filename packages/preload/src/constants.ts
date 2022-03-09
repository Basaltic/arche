import electron from 'electron';
import path from 'path';

// 默认知识库路径
export const DEFAULT_KNOWLEDGE_BASE_PATH = path.join(electron.app.getPath('appData'), 'kb', 'default');
