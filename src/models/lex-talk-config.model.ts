import { Schema, model } from 'mongoose';
import { Language } from '../core/enums/languages';

const shema = new Schema({
  lang: { type: String, default: Language.EN },
  darkMode: { type: Boolean },
});

export default model('LexTalkConfig', shema);
