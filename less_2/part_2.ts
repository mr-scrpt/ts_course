// keyof позволяет получить union ключей объекта

type Obj = {
  id: number;
  title: string;
  name: {
    value: string;
  };
};

type ObjKeys = keyof Obj;
type ObjKeysPretti = keyof Obj & {}; // Показывает всю сигнатуру

function fn(key: keyof Obj) { }
fn('id')

// keyof пустого объекта это never

type Never = keyof {};

// keyof Dict равен тому что указано в index сигнатуре

type Dict = { [key: string]: number };
function fnD(key: keyof Dict) { }
fnD("");

// Интересный факт: Создание пустого объекта через Record
type EmptyObject = Record<never, unknown>;

// keyof безопасен с любым типом, но выдаёт белеберду

type Tuple = [1, 2, 3] & {};
function fn2(key: keyof Tuple) { }
fn2(0);
fn2("concat");
type KTuple = keyof [1, 2, 3] & number;
function fn2_2(key: KTuple) { }
fn2_2(0);
// @ts-expect-error
fn2_2("concat");

type Tuple2<T, K> = [T, K];
type TupleState<T> = [T, (...args: any) => T]

type useState<T> = (...args: T[]) => TupleState<T>

const useState = <T>(initialState: T): TupleState<T> => [initialState, (params: T) => params]

const [value, setStateFn] = useState({ name: "" })

const tuple: Tuple2<() => void, string> = [() => { }, "olol"]
function fn22(key: Tuple2<number, string>) { }

fn22([5, "2"])

type Arr = number[];
function fn3(key: keyof Arr) { }
fn3("copyWithin");

type Str = number;
function fn4(key: keyof Str) { }
fn4("toExponential");

type Fn = () => void;
function fn5(key: keyof Fn) { }

// с функциями never
fn5("" as never);

