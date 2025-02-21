function Fieldset({ label, children }) {
    return (
        <fieldset className="mt-4 border-none p-0">
            {label && <legend className="text-pretty font-semibold mb-3">{label}</legend>}
            <div className="flex flex-col justify-between self-start">
                {children}
            </div>
        </fieldset>
    )
}

export default Fieldset
