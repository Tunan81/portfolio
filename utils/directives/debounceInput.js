import { debounce, isFunction } from '@/utils';

function compositionStart(event) {
  event.target.composing = true;
}

function compositionEnd(e) {
  e.target.composing = false;
  const event = new Event('input', { bubbles: true });
  e.target?.dispatchEvent(event);
}
let inputFunction;

function findInput(el) {
  const quene = [];
  quene.push(el);
  while (quene.length > 0) {
    const current = quene.shift();
    if (current?.tagName === 'INPUT') {
      return current;
    }
    if (current?.childNodes) {
      quene.push(...current.childNodes);
    }
  }
  return null;
}
export default {
  mounted(el, binding) {
    const { value, arg } = binding;
    if (value && isFunction(value)) {
      let timeout = 600;
      if (arg && !Number.isNaN(arg)) {
        timeout = Number(arg);
      }
      inputFunction = debounce(value, timeout);
      const input = findInput(el);
      el._INPUT = input;
      if (input) {
        input.addEventListener('input', inputFunction);
        input.addEventListener('compositionstart', compositionStart);
        input.addEventListener('compositionend', compositionEnd);
      }
    }
  },
  beforeUnmount(el) {
    if (el._INPUT) {
      el._INPUT.removeEventListener('input', inputFunction);
      el._INPUT.removeEventListener('compositionstart', compositionStart);
      el._INPUT.removeEventListener('compositionend', compositionEnd);
    }
  }
};
