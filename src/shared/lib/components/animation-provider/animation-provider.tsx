import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type JSX,
    type ReactNode,
} from 'react'

type SpringType = typeof import('@react-spring/web')
type GestureType = typeof import('@use-gesture/react')

interface AnimationContextPayload {
    Gesture?: GestureType
    Spring?: SpringType
    isLoaded?: boolean
}

const AnimationContext = createContext<AnimationContextPayload>({})

const getAsyncAnimationModules = async () => {
    return Promise.all([
        import('@react-spring/web'),
        import('@use-gesture/react'),
    ])
}

export const useAnimationLibs = (): AnimationContextPayload =>
    useContext(AnimationContext)

export const AnimationProvider = ({
    children,
}: {
    children: ReactNode
}): JSX.Element => {
    const SpringRef = useRef<SpringType | undefined>(undefined)
    const GestureRef = useRef<GestureType | undefined>(undefined)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring
            GestureRef.current = Gesture
            setIsLoaded(true)
        })
    }, [])

    const value = useMemo(
        () => ({
            Gesture: GestureRef.current,
            Spring: SpringRef.current,
            isLoaded,
        }),
        [isLoaded],
    )

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    )
}
