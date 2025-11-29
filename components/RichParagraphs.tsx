import ReactMarkdown from "react-markdown";

type RichParagraphsProps = {
    body: string[];
};

export function RichParagraphs({ body }: RichParagraphsProps) {
    return (
        <div className="space-y-4">
            {body.map((paragraph, i) => (
                <ReactMarkdown
                    key={i}
                    components={{
                        p: ({ children }) => <p className="leading-relaxed">{children}</p>,
                        a: ({ href, children }) => (
                            <a
                                href={href}
                                className="underline hover:text-blue-600"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {children}
                            </a>
                        )
                    }}
                >
                    {paragraph}
                </ReactMarkdown>
            ))}
        </div>
    );
}
