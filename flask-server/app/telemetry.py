def setup_telemetry(app):
    try:
        resource = Resource.create({
            "service.name": os.getenv("OTEL_SERVICE_NAME", "portfolio-server"),
            "service.version": os.getenv("APP_VERSION", "1.0.0"),
            "deployment.environment": os.getenv("FLASK_ENV", "production"),
        })

        provider = TracerProvider(resource=resource)

        endpoint = os.getenv(
            "OTEL_EXPORTER_OTLP_ENDPOINT",
            "http://otel-collector.monitoring.svc.cluster.local:4317"
        )

        otlp_exporter = OTLPSpanExporter(
            endpoint=endpoint,
            insecure=True
        )

        provider.add_span_processor(BatchSpanProcessor(otlp_exporter))
        trace.set_tracer_provider(provider)

        FlaskInstrumentor().instrument_app(app)
        RequestsInstrumentor().instrument()

        print(f"OTel tracing initialized → {endpoint}")

    except Exception as e:
        print(f"OTel setup failed (non-fatal): {e}")