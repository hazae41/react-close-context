# CloseContext for React

CloseContext provides a `close(force?)` function to React

```bash
npm i @hazae41/react-close-context
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/chemin)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies

## Usage

You can consume `CloseContext` in any component with a `close()` feature

```tsx
import { useCloseContext } from "@hazae41/react-close-context"

function Dialog(props: ChildrenProps) {
  const { children } = props

  const close = useCloseContext().unwrap()

  const onCloseClick = useCallback(() => {
    close()
  }, [close])
  
  return <div>
    <button onClick={onCloseClick}>
      Close
    </button>
    <div>
      {children}
    </div>
  </div>
}
```

You can also provide `CloseContext` to perform your own logic

```tsx
import { CloseContext } from "@hazae41/react-close-context"

function FunPage() {
  const [open, setOpen] = useState(false)

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  return <>
    <CloseContext.Provider value={onClose}>
      {open && 
        <Dialog>
          Hi
        </Dialog>}
    </CloseContext.Provider>
    <button onClick={onOpen}>
      Fun?
    </button>
  </>
}
```

You can also use the `force?` parameter to close the component as fast as possible (e.g. avoid animations)

```tsx
import { useCloseContext } from "@hazae41/react-close-context"

function Dialog(props: ChildrenProps) {
  const { children } = props

  const close = useCloseContext().unwrap()

  const [premount, setPremount] = useState(true)
  const [postmount, setPostmount] = useState(false)

  useEffect(() => {
    if (premount)
      return
    if (postmount)
      return
    close()
  }, [premount, postmount])

  const hide = useCallback((force?: boolean) => {
    if (force) {
      close()
      return
    }

    setPremount(false)
  }, [close])

  const onAnimationEnd = useCallback((e: AnimationEvent) => {
    flushSync(() => setPostmount(premount))
  }, [premount])

  const onCloseClick = useCallback(() => {
    hide()
  }, [hide])
  
  if (!premount && !postmount)
    return null

  return <div className={`${premount ? "animate-opacity-in" : "animate-opacity-out"}`}
    onAnimationEnd={onAnimationEnd}>
    <button onClick={onCloseClick}>
      Close
    </button>
    <CloseContext.Provider value={hide}>
      {children}
    </CloseContext.Provider>
  </div>
}
```